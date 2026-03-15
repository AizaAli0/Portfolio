<?php
/**
 * contact.php — Contact Form Handler
 * Ayeza Ali Portfolio
 *
 * Setup: Upload to your server's root (same level as pages/)
 * Configure: Update $to with your real email address
 * Requires: PHP with mail() enabled, or swap for PHPMailer/SMTP
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ── CONFIGURE YOUR EMAIL HERE ──
$to = 'ayezawigatech@gmail.com';         // <-- Change this to your real email
$site_name = 'Ayeza Ali Portfolio';

// ── VALIDATE REQUEST ──
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit;
}

// ── SANITIZE INPUTS ──
function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)));
}

$name    = clean($_POST['name']    ?? '');
$email   = clean($_POST['email']   ?? '');
$subject = clean($_POST['subject'] ?? 'General Inquiry');
$message = clean($_POST['message'] ?? '');

// ── VALIDATE FIELDS ──
$errors = [];
if (empty($name))    $errors[] = 'Name is required.';
if (empty($email))   $errors[] = 'Email is required.';
if (!filter_var(str_replace('&#64;', '@', $email), FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address.';
}
if (empty($message)) $errors[] = 'Message is required.';
if (strlen($message) > 5000) $errors[] = 'Message is too long.';

// Basic spam check
if (!empty($_POST['website'])) { // honeypot field
    echo json_encode(['success' => true]); // silently discard
    exit;
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// ── BUILD EMAIL ──
$subject_line = "[{$site_name}] New Message: {$subject}";

$body = "
==============================================
  NEW CONTACT MESSAGE — {$site_name}
==============================================

From:     {$name}
Email:    {$email}
Topic:    {$subject}
Date:     " . date('Y-m-d H:i:s') . "

----------------------------------------------
Message:
----------------------------------------------

{$message}

----------------------------------------------
Sent via contact form on {$site_name}
";

$headers  = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ── SEND ──
$sent = mail($to, $subject_line, $body, $headers);

if ($sent) {
    // Optional: Send confirmation email to sender
    $confirm_subject = "Message received — {$site_name}";
    $confirm_body = "Hi {$name},\n\nThank you for reaching out! I've received your message and will get back to you shortly.\n\nBest,\nAyeza Ali";
    mail($email, $confirm_subject, $confirm_body, "From: {$to}");

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please contact me directly.']);
}
?>
