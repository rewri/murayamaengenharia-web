<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

const DESTINATION_EMAIL = 'rkfumes@gmail.com';
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60;

// Optional fixed recipients. Keep empty if you do not want static CC/BCC.
const DEFAULT_CC = [];
const DEFAULT_BCC = [];

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function normalize_list(mixed $value): array
{
    if ($value === null) {
        return [];
    }

    if (!is_array($value)) {
        return [];
    }

    $result = [];

    foreach ($value as $item) {
        if (!is_string($item)) {
            continue;
        }

        $email = filter_var(trim($item), FILTER_VALIDATE_EMAIL);
        if ($email !== false) {
            $result[] = strtolower($email);
        }
    }

    return array_values(array_unique($result));
}

function sanitize_text(mixed $value, int $maxLength = 160): string
{
    if (!is_string($value)) {
        return '';
    }

    $clean = trim(preg_replace('/\s+/u', ' ', strip_tags($value)) ?? '');

    if ($clean === '') {
        return '';
    }

    if (mb_strlen($clean) > $maxLength) {
        $clean = mb_substr($clean, 0, $maxLength);
    }

    return $clean;
}

function enforce_rate_limit(string $ipAddress): void
{
    $safeIp = preg_replace('/[^0-9a-fA-F:\.]/', '_', $ipAddress);
    $filePath = sys_get_temp_dir() . '/murayama_orcamento_rate_' . $safeIp . '.json';

    $now = time();
    $windowStart = $now - RATE_LIMIT_WINDOW_SECONDS;
    $timestamps = [];

    if (is_file($filePath)) {
        $raw = file_get_contents($filePath);
        if (is_string($raw)) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                foreach ($decoded as $timestamp) {
                    if (is_int($timestamp) && $timestamp >= $windowStart) {
                        $timestamps[] = $timestamp;
                    }
                }
            }
        }
    }

    if (count($timestamps) >= MAX_REQUESTS_PER_WINDOW) {
        json_response(429, [
            'success' => false,
            'message' => 'Muitas tentativas. Aguarde um momento e tente novamente.',
        ]);
    }

    $timestamps[] = $now;
    @file_put_contents($filePath, json_encode($timestamps), LOCK_EX);
}

function validate_origin(): void
{
    if (!isset($_SERVER['HTTP_ORIGIN']) || $_SERVER['HTTP_ORIGIN'] === '') {
        return;
    }

    $originHost = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $serverHost = $_SERVER['HTTP_HOST'] ?? '';

    if (!is_string($originHost) || !is_string($serverHost)) {
        json_response(403, ['success' => false, 'message' => 'Origem invalida.']);
    }

    $serverHost = explode(':', $serverHost)[0];

    if (strcasecmp($originHost, $serverHost) !== 0) {
        json_response(403, ['success' => false, 'message' => 'Origem nao autorizada.']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['success' => false, 'message' => 'Metodo nao permitido.']);
}

validate_origin();

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
enforce_rate_limit((string) $clientIp);

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (!is_string($contentType) || stripos($contentType, 'application/json') !== 0) {
    json_response(415, [
        'success' => false,
        'message' => 'Tipo de conteudo invalido. Use application/json.',
    ]);
}

$rawInput = file_get_contents('php://input');
if (!is_string($rawInput) || $rawInput === '') {
    json_response(400, ['success' => false, 'message' => 'Payload vazio.']);
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    json_response(400, ['success' => false, 'message' => 'JSON invalido.']);
}

$source = $data['source'] ?? '';
if (!is_string($source) || $source !== 'site_chatbot') {
    json_response(400, ['success' => false, 'message' => 'Fonte invalida.']);
}

$submittedAt = $data['submittedAt'] ?? '';
if (!is_string($submittedAt) || strtotime($submittedAt) === false) {
    json_response(400, ['success' => false, 'message' => 'Data de envio invalida.']);
}

$honeypot = $data['honeypot'] ?? '';
if (is_string($honeypot) && trim($honeypot) !== '') {
    json_response(400, ['success' => false, 'message' => 'Requisicao invalida.']);
}

$contact = $data['contact'] ?? null;
if (!is_array($contact)) {
    json_response(400, ['success' => false, 'message' => 'Contato invalido.']);
}

$name = sanitize_text($contact['name'] ?? '', 120);
if ($name === '' || mb_strlen($name) < 2) {
    json_response(400, ['success' => false, 'message' => 'Nome invalido.']);
}

$phoneRaw = isset($contact['phone']) && is_string($contact['phone']) ? $contact['phone'] : '';
$phoneDigits = preg_replace('/\D+/', '', $phoneRaw) ?? '';
if (strlen($phoneDigits) < 10 || strlen($phoneDigits) > 11) {
    json_response(400, ['success' => false, 'message' => 'Telefone invalido.']);
}

$email = '';
if (isset($contact['email']) && is_string($contact['email']) && trim($contact['email']) !== '') {
    $validatedEmail = filter_var(trim($contact['email']), FILTER_VALIDATE_EMAIL);
    if ($validatedEmail === false) {
        json_response(400, ['success' => false, 'message' => 'E-mail invalido.']);
    }
    $email = strtolower($validatedEmail);
}

$allowedAnswers = [
    'service' => ['projeto_arquitetonico', 'obra_completa', 'projeto_complementar', 'incendio', 'laudo_pericia', 'manutencao_predial', 'outro'],
    'project_type' => ['residencial', 'comercial', 'industrial', 'institucional', 'outro'],
    'stage' => ['ideia', 'anteprojeto', 'projeto_aprovado', 'obra_andamento', 'reforma'],
    'goal' => ['construir', 'reformar', 'ampliar', 'regularizar', 'vistoriar'],
    'location' => ['botucatu', 'regiao', 'outro_estado'],
    'area_range' => ['ate_100', '101_300', '301_1000', 'acima_1000', 'nao_sei'],
    'start_deadline' => ['imediato', '1_3_meses', '3_6_meses', 'mais_6_meses'],
    'budget_range' => ['ate_100k', '100_300k', '300k_1m', 'acima_1m', 'prefiro_nao_informar'],
];

$answers = $data['answers'] ?? null;
if (!is_array($answers)) {
    json_response(400, ['success' => false, 'message' => 'Respostas invalidas.']);
}

$normalizedAnswers = [];
foreach ($allowedAnswers as $questionId => $validValues) {
    $value = $answers[$questionId] ?? null;

    if (!is_string($value) || !in_array($value, $validValues, true)) {
        json_response(400, [
            'success' => false,
            'message' => 'Respostas incompletas ou invalidas.',
        ]);
    }

    $normalizedAnswers[$questionId] = $value;
}

$extraAnswerKeys = array_diff(array_keys($answers), array_keys($allowedAnswers));
if (count($extraAnswerKeys) > 0) {
    json_response(400, ['success' => false, 'message' => 'Formato de respostas invalido.']);
}

$answerLabels = [
    'service' => 'Servico',
    'project_type' => 'Tipo de empreendimento',
    'stage' => 'Etapa atual',
    'goal' => 'Objetivo principal',
    'location' => 'Localizacao',
    'area_range' => 'Faixa de area',
    'start_deadline' => 'Prazo para inicio',
    'budget_range' => 'Faixa de investimento',
];

$lines = [];
$lines[] = 'Novo lead de orcamento enviado pelo site.';
$lines[] = '';
$lines[] = 'Contato:';
$lines[] = 'Nome: ' . $name;
$lines[] = 'Telefone: ' . $phoneDigits;
$lines[] = 'E-mail: ' . ($email !== '' ? $email : 'Nao informado');
$lines[] = '';
$lines[] = 'Respostas do chatbot:';

foreach ($normalizedAnswers as $key => $value) {
    $label = $answerLabels[$key] ?? $key;
    $lines[] = $label . ': ' . $value;
}

$lines[] = '';
$lines[] = 'Metadados:';
$lines[] = 'Source: site_chatbot';
$lines[] = 'SubmittedAt: ' . $submittedAt;
$lines[] = 'IP: ' . $clientIp;
$lines[] = 'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown');

$emailBody = implode("\r\n", $lines);

$to = DESTINATION_EMAIL;
$subjectRaw = "Or\xC3\xA7amento - Site";
$subject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subjectRaw, 'UTF-8', 'B', "\r\n")
    : $subjectRaw;

$serverHost = $_SERVER['HTTP_HOST'] ?? 'murayamaengenharia.com.br';
$safeHost = preg_replace('/[^a-zA-Z0-9\.-]/', '', (string) $serverHost);
if ($safeHost === '') {
    $safeHost = 'murayamaengenharia.com.br';
}

$fromAddress = 'no-reply@' . $safeHost;

$ccFromPayload = normalize_list($data['cc'] ?? null);
$bccFromPayload = normalize_list($data['bcc'] ?? null);
$ccList = array_values(array_unique(array_merge(DEFAULT_CC, $ccFromPayload)));
$bccList = array_values(array_unique(array_merge(DEFAULT_BCC, $bccFromPayload)));

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Murayama Engenharia <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . ($email !== '' ? $email : $fromAddress);

if (count($ccList) > 0) {
    $headers[] = 'Cc: ' . implode(', ', $ccList);
}

if (count($bccList) > 0) {
    $headers[] = 'Bcc: ' . implode(', ', $bccList);
}

$sent = @mail($to, $subject, $emailBody, implode("\r\n", $headers));

if (!$sent) {
    json_response(500, [
        'success' => false,
        'message' => 'Não foi possível enviar agora. Tente novamente mais tarde.',
    ]);
}

json_response(200, [
    'success' => true,
    'message' => 'Solicitação enviada com sucesso!',
]);
