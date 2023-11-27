package com.ead.train_management.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class bookingUpdate implements Serializable  {

    //Declare attributes

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("referenceId")
    @Expose
    private String  rfid;
    @SerializedName("travallerName")
    @Expose
    private String  name;

    @SerializedName("travallerProfile")
    @Expose
    private String  tid;

    @SerializedName("phoneNumber")
    @Expose
    private String  phone;

    @SerializedName("train")
    @Expose
    private String  train;


    @SerializedName("noOfPassenger")
    @Expose
    private int  num;

    @SerializedName("emailAddress")
    @Expose
    private String  email;

    @SerializedName("reservationDate")
    @Expose
    private String  date;

    @SerializedName("isCancelled")
    @Expose
    private boolean  cc;

    //Setters and getters for each property

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRfid() {
        return rfid;
    }

    public void setRfid(String rfid) {
        this.rfid = rfid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTrain() {
        return train;
    }

    public void setTrain(String train) {
        this.train = train;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isCc() {
        return cc;
    }

    public void setCc(boolean cc) {
        this.cc = cc;
    }
}
