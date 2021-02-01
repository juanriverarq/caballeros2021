#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@import UserNotifications;
#import <UserNotifications/UserNotifications.h> // Agregar esta linea

@interface AppDelegate : UIResponder <UIApplicationDelegate, UNUserNotificationCenterDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
