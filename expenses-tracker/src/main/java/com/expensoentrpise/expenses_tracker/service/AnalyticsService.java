package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.CategoryChartDTO;
import com.expensoentrpise.expenses_tracker.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final AnalyticsRepository analyticsRepository;

    /**
     * Generic method to fetch category-wise data
     */

    public List<CategoryChartDTO> getCategoryChart(Long userId , String type){
        return analyticsRepository.getCategoryWiseTotals(userId , type)
                .stream()
                .map(row->new CategoryChartDTO(
                        (String) row[0], //Category name
                        (BigDecimal) row[1] //total amount
                ))
                .toList();
    }
}
