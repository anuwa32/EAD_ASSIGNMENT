package com.ead.train_management.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class disableAccount {
    @SerializedName("AccStatus")
    @Expose
    private boolean acc;

    public boolean isAcc() {
        return acc;
    }

    //Add setters
    public void setAcc(boolean acc) {
        this.acc = acc;
    }
}
