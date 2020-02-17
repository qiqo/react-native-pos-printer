package com.reactlibrary.pos.interfaces;

import com.reactlibrary.pos.DeviceConnectionStatusCallbacks;

public interface IPrintingService {
    public byte[] read();

    public int write(byte[] data);

    public void setCallbacks(DeviceConnectionStatusCallbacks callbacks);

    public int getStatus();
}
