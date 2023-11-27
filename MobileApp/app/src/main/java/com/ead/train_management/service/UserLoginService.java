package com.ead.train_management.service;

import com.ead.train_management.models.disableAccount;
import com.ead.train_management.models.Login;
import com.ead.train_management.models.loginRes;
import com.ead.train_management.models.userDetails;
import com.ead.train_management.models.userResources;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * User and AUth services
 */

public interface UserLoginService {

    //for login
    @POST("Login")
    Call<loginRes> Login(@Body Login lg);

    //get user details
    @GET("api/TravelerProfile/{id}")
    Call<userResources> getUserProfile(@Path("id") String nic);

    //Create new user
    @POST("api/TravelerProfile")
    Call<userResources> Reg(@Body userDetails u);

    //Update user profile
    @POST("api/TravelerProfile/")
    Call<userResources> Update(@Body userResources u);

    //Disable user profile
    @PUT("api/TravelerProfile/{id}")
    Call<userResources> Dis(@Path("id") String nic , @Body disableAccount db);

}



