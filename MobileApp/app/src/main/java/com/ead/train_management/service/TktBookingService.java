package com.ead.train_management.service;

import com.ead.train_management.models.TicketBooking;
import com.ead.train_management.models.BookingStatus;
import com.ead.train_management.models.TrainDetails;
import com.ead.train_management.models.bookingUpdate;
import com.ead.train_management.models.viewBookingDetails;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

/**
 * Booking service
 */
public interface TktBookingService {

    //Get reservation details
    @GET("api/Reservation/{id}")
    Call<List<viewBookingDetails>> getBooking(@Path("id") String nic);

    //Create bookings
    @POST("api/Reservation")
    Call<String> createBooking(@Body TicketBooking u);

    //Update reservation details
    @PUT("api/Reservation/{id}")
    Call<String> removeBooking(@Path("id") String id ,@Body BookingStatus db);

    //Get train details
    @GET("api/Train")
    Call<List<TrainDetails>> getTrain();

    //Update booking details
    @POST("api/Reservation")
    Call<String> updateBooking(@Body bookingUpdate u);


}


