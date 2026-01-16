package com.expensoentrpise.expenses_tracker.repository;

import com.expensoentrpise.expenses_tracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalyticsRepository extends JpaRepository<Transaction , Long> {
    /**
     * Fetch category-wise totals for a given type (INCOME / EXPENSE)
     * for the CURRENT MONTH and given USER
     */
    @Query(value = """
    SELECT c.name, SUM(t.amount)
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = :userId
      AND t.type = :type
      AND EXTRACT(MONTH FROM t.transaction_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY c.name
""", nativeQuery = true)
    List<Object[]> getCategoryWiseTotals(
            @Param("userId") Long userId,
            @Param("type") String type
    );

}
