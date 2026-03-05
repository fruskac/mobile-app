#import "AppDelegate.h"

#import <TargetConditionals.h>
#import <React/RCTBundleURLProvider.h>
#if __has_include(<React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>)
#import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <React-RCTAppDelegate/RCTReactNativeFactory.h>
#elif __has_include(<React_RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>)
#import <React_RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <React_RCTAppDelegate/RCTReactNativeFactory.h>
#else
#import <RCTDefaultReactNativeFactoryDelegate.h>
#import <RCTReactNativeFactory.h>
#endif

#if __has_include(<ReactAppDependencyProvider/RCTAppDependencyProvider.h>)
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#elif __has_include("RCTAppDependencyProvider.h")
#import "RCTAppDependencyProvider.h"
#endif

#import <React/RCTBridge.h>

@interface FruskacReactNativeDelegate : RCTDefaultReactNativeFactoryDelegate
@end

@implementation FruskacReactNativeDelegate

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  RCTBundleURLProvider *bundleURLProvider = [RCTBundleURLProvider sharedSettings];
#if TARGET_OS_SIMULATOR
  [bundleURLProvider setJsLocation:@"127.0.0.1"];
#endif
  return [bundleURLProvider jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

@interface AppDelegate ()

@property (nonatomic, strong) FruskacReactNativeDelegate *reactNativeDelegate;
@property (nonatomic, strong) RCTReactNativeFactory *reactNativeFactory;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.reactNativeDelegate = [FruskacReactNativeDelegate new];
#if __has_include(<ReactAppDependencyProvider/RCTAppDependencyProvider.h>) || __has_include("RCTAppDependencyProvider.h")
  self.reactNativeDelegate.dependencyProvider = [RCTAppDependencyProvider new];
#endif
  self.reactNativeFactory = [[RCTReactNativeFactory alloc] initWithDelegate:self.reactNativeDelegate];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [self.reactNativeFactory startReactNativeWithModuleName:@"Fruskac"
                                                 inWindow:self.window
                                            launchOptions:launchOptions];
  return YES;
}

@end
