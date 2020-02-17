package com.reactlibrary.pos;

import com.reactlibrary.pos.interfaces.IDevice;
import com.reactlibrary.pos.interfaces.IDeviceDiscoverer;

public abstract class DiscoveryCallbacks {
    public abstract void onStatusChanged(IDeviceDiscoverer discoverer);

    public abstract void onDeviceDiscovered(IDevice device);
}
