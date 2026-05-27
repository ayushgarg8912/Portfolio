package com.spring.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactRequest request) {

        emailService.sendEmail(request);

        return ResponseEntity.ok("Message sent successfully");
    }
}