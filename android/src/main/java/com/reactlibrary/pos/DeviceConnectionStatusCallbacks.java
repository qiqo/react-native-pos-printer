package com.reactlibrary.pos;

import com.reactlibrary.pos.interfaces.IDevice;
import com.reactlibrary.pos.interfaces.IPrintingService;

public abstract class DeviceConnectionStatusCallbacks {
    public abstract void onStatusChanged(IDevice device, IPrintingService service);

}
