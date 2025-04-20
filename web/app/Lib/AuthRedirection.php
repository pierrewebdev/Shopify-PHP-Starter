<?php

declare(strict_types=1);

namespace App\Lib;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Shopify\Auth\OAuth;
use Shopify\Context;
use Shopify\Utils;

class AuthRedirection
{
    public static function redirect(Request $request, bool $isOnline = false): RedirectResponse
    {
        $shop = Utils::sanitizeShopDomain($request->query("shop"));

        if (Context::$IS_EMBEDDED_APP && $request->query("embedded", false) === "1") {
            $redirectUrl = self::clientSideRedirectUrl($shop, $request->query());
        } else {
            $redirectUrl = self::serverSideRedirectUrl($shop, $isOnline);
        }

        // error_log("Doing a Client Side Redirect");
        // error_log("Redirect URL: " . $redirectUrl);
        return redirect($redirectUrl);
    }

    private static function serverSideRedirectUrl(string $shop, bool $isOnline): string
    {
        return OAuth::begin(
            $shop,
            '/auth/redirect',
            $isOnline,
            ['App\Lib\CookieHandler', 'saveShopifyCookie'],
        );
    }

    private static function clientSideRedirectUrl($shop, array $query): string
    {
        $appHost = Context::$HOST_NAME;
        $redirectUri = urlencode("https://$appHost/auth?shop=$shop");

        $queryString = http_build_query(array_merge($query, ["redirectUri" => $redirectUri]));
        return "/ExitIframe?$queryString";
    }
}
