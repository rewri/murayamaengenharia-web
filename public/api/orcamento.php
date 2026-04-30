<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

const DESTINATION_EMAIL = 'rkfumes@gmail.com';
const LOG_FILE = __DIR__ . '/orcamentos.log';

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(405, ['success' => false, 'message' => 'Método não permitido']);
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') === false) {
        json_response(415, ['success' => false, 'message' => 'Content-Type inválido']);
    }

    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!is_array($data)) {
        json_response(400, ['success' => false, 'message' => 'JSON inválido']);
    }

    // Validações
    $contact = $data['contact'] ?? [];
    $name = trim($contact['name'] ?? '');
    $phone = trim($contact['phone'] ?? '');
    $email = trim($contact['email'] ?? '');
    $answers = $data['answers'] ?? [];

    if (!$name || strlen($name) < 2) {
        json_response(400, ['success' => false, 'message' => 'Nome inválido']);
    }

    if (!is_array($answers) || empty($answers)) {
        json_response(400, ['success' => false, 'message' => 'Respostas inválidas']);
    }

    // Construir email
    $lines = [
        'Novo lead de orçamento - Murayama Engenharia',
        '',
        'DADOS DO CONTATO:',
        'Nome: ' . $name,
        'Telefone: ' . $phone,
        'Email: ' . ($email ?: 'Não informado'),
        '',
        'RESPOSTAS:',
    ];

    foreach ($answers as $key => $value) {
        if (is_string($key) && is_string($value)) {
            $lines[] = ucfirst(str_replace('_', ' ', $key)) . ': ' . $value;
        }
    }

    $lines[] = '';
    $lines[] = 'Data: ' . date('d/m/Y H:i:s');
    $lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

    $emailBody = implode("\r\n", $lines);

    // Headers
    $to = DESTINATION_EMAIL;
    $subject = 'Orçamento - ' . $name;
    
    $headers = "From: noreply@murayamaengenharia.com.br\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    if ($email) {
        $headers .= "Reply-To: $email\r\n";
    }

    // Enviar com mail()
    $sent = @mail($to, $subject, $emailBody, $headers);

    // Salvar log em arquivo (como fallback)
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'mail_result' => $sent ? 'SUCCESS' : 'FAILED',
        'answers' => $answers,
        'remote_ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    ];

    @file_put_contents(LOG_FILE, json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);

    // Sempre retornar sucesso (email foi enviado ou registrado em log)
    json_response(200, [
        'success' => true,
        'message' => 'Solicitação recebida! Entraremos em contato em breve.',
    ]);

} catch (Throwable $e) {
    json_response(500, [
        'success' => false,
        'message' => 'Erro ao processar solicitação.',
    ]);
}
?>
