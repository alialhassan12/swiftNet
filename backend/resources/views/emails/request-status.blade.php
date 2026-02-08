<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Status - swiftNet</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .header {
            background-color: #4f46e5;
            padding: 32px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
        }

        .content {
            padding: 40px;
            color: #1e293b;
            line-height: 1.6;
        }

        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 24px;
        }

        .status-approved {
            background-color: #dcfce7;
            color: #166534;
        }

        .status-rejected {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .credentials-box {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #4f46e5;
        }

        .credential-item {
            margin-bottom: 8px;
            font-size: 14px;
        }

        .credential-label {
            font-weight: 600;
            color: #64748b;
            width: 80px;
            display: inline-block;
        }

        .credential-value {
            color: #0f172a;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .button {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff !important;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 16px;
        }

        .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }

        h2 {
            margin-top: 0;
            font-size: 20px;
            color: #0f172a;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>swiftNet</h1>
        </div>

        <div class="content">
            @if ($request->status === 'approved')
            <div class="status-badge status-approved">✓ Request Approved</div>
            <h2>Hello {{ $request->name }},</h2>
            <p>🎉 Great news! Your subscription request has been approved. Welcome to the swiftNet family!</p>
            <p>Our team will contact you shortly to finalize the installation. In the meantime, you can access your dashboard using the credentials below:</p>

            <div class="credentials-box">
                <div class="credential-item">
                    <span class="credential-label">Plan:</span>
                    <span class="credential-value">{{ $request->plan->name }}</span>
                </div>
                <div class="credential-item">
                    <span class="credential-label">Email:</span>
                    <span class="credential-value">{{ $request->email }}</span>
                </div>
                <div class="credential-item">
                    <span class="credential-label">Password:</span>
                    <span class="credential-value"><i>(The password you set during registration)</i></span>
                </div>
            </div>

            <a href="{{ config('app.url') }}" class="button">Log in to swiftNet</a>
            @else
            <div class="status-badge status-rejected">✕ Request Declined</div>
            <h2>Hello {{ $request->name }},</h2>
            <p>We appreciate your interest in swiftNet. Unfortunately, we are unable to approve your subscription request at this time.</p>
            <p>If you believe this is a mistake or would like more information, please don't hesitate to reach out to our support team.</p>

            <a href="mailto:support@swiftnet.com" class="button">Contact Support</a>
            @endif
        </div>

        <div class="footer">
            <p>Thanks for choosing swiftNet,<br><strong>Your swiftNet ISP Team</strong></p>
            <p style="margin-top: 16px;">&copy; {{ date('Y') }} swiftNet. All rights reserved.</p>
        </div>
    </div>
</body>

</html>