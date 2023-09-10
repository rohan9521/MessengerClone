package com.example.MessengerClone.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatMessage {
    private String senderUserId;
    private String receiverUserId;
    private String message;
    private String date;
    private Status status;
}