<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

namespace app\common\middleware;

use app\common\repositories\openapi\OpenAuthRepository;
use app\common\repositories\system\merchant\MerchantRepository;
use app\Request;
use crmeb\exceptions\AuthException;
use crmeb\services\JwtTokenService;
use Firebase\JWT\ExpiredException;
use think\exception\ValidateException;
use think\Response;
use Throwable;

class OpenApiAuthMiddleware extends BaseMiddleware
{

    public function before(Request $request)
    {
        $unique     = $request->param('unique');
        $expiration = $request->param('expiration');
        $access_key = $request->param('access_key');
        $signature  = $request->param('signature');
        if (!$unique || !$expiration || !$access_key || !$signature) throw new AuthException('验证失败,请完善参数');
        if ((time() - $expiration) > 300) throw new AuthException('验证已过期');

        $openAuthRepository = app()->make(OpenAuthRepository::class);
        $auth = $openAuthRepository->getSearch(['access_key' => $access_key])->find();
        $secret_key = $auth->secret_key;

        $credential = ['mer','openapi'];
        $policy = [
            'access_key' => $access_key,
            'conditions' => $access_key.'/'.implode('/', $credential),
            'expiration' =>  date('YmdHis',$expiration),
            'unique' => $unique
        ];
        ksort($policy);
        $policy = json_encode($policy);
        $jsonPolicy64 = base64_encode($policy);
        $_signature = bin2hex(hash_hmac('sha256', $jsonPolicy64, $secret_key, true));

        if ($signature !== $_signature)  throw new AuthException('验证失败');
        if ($auth->status != 1 || $auth->is_del) throw new AuthException('账号已被禁用');
        $request->macro('openAuthInfo', function () use($auth) {
            unset($auth['secret_key']);
            return $auth;
        });
        $request->macro('isAuth', function () {
            return true;
        });
        $request->macro('openMerId', function () use($auth) {
            return $auth->mer_id;
        });
        $request->macro('openRoule', function () use($auth) {
            return $auth->auth;
        });
        $auth->last_time = date('Y-m-d H:i:s', time());
        $auth->last_ip = request()->ip();
        $auth->save();
    }

    public function after(Response $response)
    {
        // TODO: Implement after() method.
    }
}
