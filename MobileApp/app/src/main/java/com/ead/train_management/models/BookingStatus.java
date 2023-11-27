package com.ead.train_management.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BookingStatus {
    @SerializedName("isCancelled")
    @Expose
    private boolean acc;

    // Getter method for 'isCancelled'.
    public boolean isAcc() {
        return acc;
    }

    // Setter method for 'isCancelled'.
    public void setAcc(boolean acc) {
        this.acc = acc;
    }
}
