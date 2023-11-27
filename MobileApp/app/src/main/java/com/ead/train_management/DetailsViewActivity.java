package com.ead.train_management;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.Toast;

import com.ead.train_management.models.viewBookingDetails;
import com.ead.train_management.service.TktBookingService;
import com.ead.train_management.util.DatabaseHelper;
import com.ead.train_management.util.MyAdapter;
import com.ead.train_management.util.RetClient;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

@SuppressWarnings("deprecation")
public class DetailsViewActivity extends AppCompatActivity {
    private TktBookingService bgService;
    private Cursor cursor;
    private  String nic = "";
    private String userid = "";
    private DatabaseHelper dbHelper;
    private SQLiteDatabase db;


    // Used to called when the activity is created.
    @SuppressLint({"NonConstantResourceId", "Range"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view);

        //Bottom navigation view.
        BottomNavigationView bottomNavigationView=findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.view);

        //Set click listeners for bottom navigation items.
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            switch(item.getItemId())
            {
                case R.id.book:
                    startActivity(new Intent(getApplicationContext(), AddTicketBookingActivity.class));
                    overridePendingTransition(0,0);
                    return true;

                case R.id.home:
                    startActivity(new Intent(getApplicationContext(), UserProfileActivity.class));
                    overridePendingTransition(0,0);
                    return true;

                case R.id.view:
                    return true;
            }
            return false;
        });

        // Initialize the BookingService
        bgService =  RetClient.getClient().create(TktBookingService.class);
        dbHelper = new DatabaseHelper(getApplicationContext());
        db = dbHelper.getWritableDatabase();

        // Define the projection for the database query.
        String[] projection = {
                "nic",
                "userid"
        };

        // Retrieve user information.
        cursor = db.query(
                "users",
                projection,
                null,
                null,
                null,
                null,
                null
        );

        // Check extract NIC and UID if available or not.
        if (cursor.moveToFirst()) {
            nic = cursor.getString(cursor.getColumnIndex("nic"));
            userid  = cursor.getString(cursor.getColumnIndex("userid"));
        }

        // Initialize the RecyclerView for displaying booking data.
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Make an API call to retrieve booking data based on NIC.
        Call<List<viewBookingDetails>> data = bgService.getBooking(nic);

        // Handle the API response.
        data.enqueue(new Callback<List<viewBookingDetails>>() {
            @Override
            public void onResponse(Call<List<viewBookingDetails>> call1, Response<List<viewBookingDetails>> response1) {
                if (response1.isSuccessful() && response1.body() != null) {
                    List<viewBookingDetails> dataList = response1.body();

                    // Remove entries where isCc is true.
                    dataList.removeIf(viewBookingDetails::isCc);

                    // Create an adapter and set it for the RecyclerView.
                    MyAdapter adapter = new MyAdapter(dataList);
                    recyclerView.setAdapter(adapter);
                } else {
                    Toast.makeText(DetailsViewActivity.this, "Error in Viewing process", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<viewBookingDetails>> call, Throwable t) {
                Toast.makeText(DetailsViewActivity.this, "Error please try again", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
