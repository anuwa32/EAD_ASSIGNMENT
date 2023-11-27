package com.ead.train_management.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class TrainDetails {

    //Define properties
    @SerializedName("id")
    @Expose
    private String tidc;

    @SerializedName("TrainName")
    @Expose
    private String tname;

    //Call getters and setters
    public String getTname() {
        return tname;
    }

    public String getTidc() {
        return tidc;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public void setTidc(String tidc) {
        this.tidc = tidc;
    }
}
