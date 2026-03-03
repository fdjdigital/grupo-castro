<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $file = $_FILES['file'];

    $to = 'rh@bygrupocastro.com.br'; // Substitua pelo e-mail do destinatário
    $subject = 'Novo currículo recebido';
    $message = "Nome: $name\nE-mail: $email\nTelefone: $telefone";

    // Cria um boundary
    $boundary = md5(uniqid(time()));

    // Configura os headers do e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Mensagem com o arquivo anexado
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n";
    $body .= "\r\n$message\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . $file['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n";
    $body .= "\r\n" . chunk_split(base64_encode(file_get_contents($file['tmp_name']))) . "\r\n";
    $body .= "--$boundary--";

    // Envia o e-mail
    if (mail($to, $subject, $body, $headers)) {
            // Redireciona para a URL desejada
            header('Location: ../trabalhe-conosco/sucesso/');
            exit();
        }
}
?>
