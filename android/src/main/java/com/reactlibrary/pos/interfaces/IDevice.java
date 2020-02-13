package com.reactlibrary.pos.interfaces;

import com.reactlibrary.pos.DeviceConnectionStatusCallbacks;

public interface IDevice {
    public abstract String getIdentifier();

    public abstract String getDisplayName();

    public abstract IPrintingService startService(DeviceConnectionStatusCallbacks callbacks) throws Exception;
}

