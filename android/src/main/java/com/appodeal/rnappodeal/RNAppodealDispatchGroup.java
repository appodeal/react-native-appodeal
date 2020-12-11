package com.appodeal.rnappodeal;

public class RNAppodealDispatchGroup {
    private int count = 0;
    private Runnable runnable;

    public RNAppodealDispatchGroup()
    {
        super();
        count = 0;
    }

    public synchronized void enter() {
        count++;
    }

    public synchronized void leave() {
        count--;
        notifyGroup();
    }

    public void notify(Runnable r) {
        runnable = r;
    }

    private void notifyGroup() {
        if (count <= 0 && runnable != null) {
            runnable.run();
            runnable = null;
        }
    }
}
