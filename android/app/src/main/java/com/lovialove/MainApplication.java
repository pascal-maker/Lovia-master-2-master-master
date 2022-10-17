package com.lovialove;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import android.app.Application;
import android.content.Intent;
import android.content.res.Configuration;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.instadating.launchapplication.LaunchApplicationPackage;
import com.instadating.videoplayer.VideoPlayerPackage;
import com.lovialove.generated.BasePackageList;

import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;

import java.util.Arrays;
import java.util.List;

// import com.twiliorn.library.TwilioPackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);

  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(this, new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
        new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
      packages.addAll(unimodules);
      packages.add(new VideoPlayerPackage());
      // packages.add(new TwilioPackage());
      packages.add(new LaunchApplicationPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  });

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }
}
