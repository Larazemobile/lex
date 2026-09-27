package com.orbitakidx.lex;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(OrbitakidxBillingPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
