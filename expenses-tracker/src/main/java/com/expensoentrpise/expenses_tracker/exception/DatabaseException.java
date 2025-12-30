package com.expensoentrpise.expenses_tracker.exception;

public class DatabaseException extends RuntimeException {
  public DatabaseException(String message) {
    super(message);
  }
}
