<?php

header('Content-Type: application/json; charset=utf-8');

const LOG_FILE = __DIR__ . '/orcamentos.log';

if (!file_exists(LOG_FILE)) {
    echo json_encode(['message' => 'Nenhum registro ainda'], JSON_PRETTY_PRINT);
    exit;
}

$logs = [];
$content = file_get_contents(LOG_FILE);
$lines = explode("\n", trim($content));

foreach ($lines as $line) {
    if (trim($line)) {
        $log = json_decode($line, true);
        if (is_array($log)) {
            $logs[] = $log;
        }
    }
}

// Reverter para mostrar mais recentes primeiro
$logs = array_reverse($logs);

echo json_encode([
    'total' => count($logs),
    'records' => $logs
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
