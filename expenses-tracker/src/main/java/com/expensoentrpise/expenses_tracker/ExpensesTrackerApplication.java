package com.expensoentrpise.expenses_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpensesTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpensesTrackerApplication.class, args);

        // Application startup message
        System.out.println("\n" +
                "╔══════════════════════════════════════════╗\n" +
                "║        Expenso Backend Started           ║\n" +
                "║                                          ║\n" +
                "║  🌐 Server: http://localhost:8080        ║\n" +
                "║  📋 Health: /actuator/health             ║\n" +
                "║  🧪 Test: /api/test                      ║\n" +
                "║                                          ║\n" +
                "║  Ready to serve Expenso Frontend!        ║\n" +
                "╚══════════════════════════════════════════╝\n");

    }

}
