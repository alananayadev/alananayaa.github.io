<?php
    $subject = "New message from alananayadev.com";
    $message =  '<html>
    <head>
        <title>New Message!</title>
        <style>
            * {
                font-family: Helvetica, sans-serif, Arial;
            }
            hr {
                width: 90%;
                height: 1px;
                border: none;
                background-color: #c5c5c5;
            }
            h1 {
                font-size: 2.1em;
                font-weight: 400;
                color: #555555;
                margin-left: 10px;
            }
            h2 {
                font-size: 1.5em;
                font-weight: 200;
                color: #555555;
                margin-left: 10px;
            }
            .card {
                border: 1px solid #dbdbdb;
                padding: 10px;
                width: 90%;
                box-shadow: 3px 3px 10px 2px rgba(0,0,0,0.2);
                -webkit-box-shadow: 3px 3px 10px 2px rgba(0,0,0,0.2);
                -moz-box-shadow: 3px 3px 10px 2px rgba(0,0,0,0.2);
            }
            .card > p {
                font-size: 1.3em;
                color: #878787
            }
        </style>
    </head>
    <body>
        <h1>New message received!</h1>
        <hr>
        <h2>'.$_POST['subject'].'</h4>
        <div class="card">
            <p>'.$_POST['message'].'</p>
        </div>
    </body>
</html>';
    $headers = array(
        'From' => $_POST['name']."<".$_POST['email'].">",
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=utf-8'
    );
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(200);
    if (empty($subject) || empty($_POST['name']) || empty($_POST['email']) || empty($message)) {
        echo json_encode(array("success" => false, "message" => "Please write your information correctly."));
    } else if (mail("hello@alananayadev.com", $subject, $message, $headers)) {
        echo json_encode(array("success" => true, "message" => "Mail sent correctly."));
    } else {
        echo json_encode(array("success" => false, "message" => "Mail couldn't be sent. Please try again or contact administrator."));
    }
?>