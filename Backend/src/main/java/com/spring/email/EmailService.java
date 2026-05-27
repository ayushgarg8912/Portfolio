package com.spring.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(ContactRequest request  ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo("ayushgarg8912@gmail.com");
        message.setSubject("Portfolio Contact Form");

        message.setText(
                "Name: " + request.getName() +
                        "\nEmail: " + request.getEmail() +
                        "\nMessage: " + request.getMessage()
        );

        mailSender.send(message);
    }
}