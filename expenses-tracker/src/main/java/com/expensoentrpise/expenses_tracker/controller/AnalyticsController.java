package com.expensoentrpise.expenses_tracker.controller;

import com.expensoentrpise.expenses_tracker.dto.CategoryChartDTO;
import com.expensoentrpise.expenses_tracker.service.AnalyticsService;
import com.expensoentrpise.expenses_tracker.util.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    /**
     * Category-wise EXPENSE chart (current month)
     */
    @GetMapping("/category/expense")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<StandardResponse> expenseChart(HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("userId");

        List<CategoryChartDTO> data =
                analyticsService.getCategoryChart(userId, "EXPENSE");

        return new ResponseEntity<>(
                new StandardResponse(200, "Expense chart loaded", data),
                HttpStatus.OK
        );
    }


    /**
     * Category-wise INCOME chart (current month)
     */
    @GetMapping("/category/income")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<StandardResponse> incomeChart(HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("userId");

        List<CategoryChartDTO> data =
                analyticsService.getCategoryChart(userId, "INCOME");

        return new ResponseEntity<>(
                new StandardResponse(200, "Income chart loaded", data),
                HttpStatus.OK
        );
    }

}
