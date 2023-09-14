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

use app\common\middleware\AdminAuthMiddleware;
use app\common\middleware\AdminTokenMiddleware;
use app\common\middleware\AllowOriginMiddleware;
use app\common\middleware\InstallMiddleware;
use app\common\middleware\LogMiddleware;
use app\common\middleware\RequestLockMiddleware;
use think\facade\Route;

Route::group(config('admin.api_openapi_prefix') . '/', function () {

    $path = $this->app->getRootPath() . 'route' . DIRECTORY_SEPARATOR.'openapi';
    $files = scandir($path);
    foreach ($files as $file) {
        if($file != '.' && $file != '..'){
            include $path . DIRECTORY_SEPARATOR . $file;
        }
    }
        Route::miss(function () {
        return app('json')->fail('接口不存在');
    })->middleware(AllowOriginMiddleware::class);

})
    ->option([
        '_lock' => false
    ])
    ->middleware(InstallMiddleware::class)
    ->middleware(RequestLockMiddleware::class);
