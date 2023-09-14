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

use think\facade\Route;
use app\common\middleware\LogMiddleware;
use app\common\middleware\AllowOriginMiddleware;
use app\common\middleware\MerchantAuthMiddleware;
use app\common\middleware\MerchantTokenMiddleware;
use app\common\middleware\MerchantCheckBaseInfoMiddleware;

Route::group(function () {
    Route::group('order',function(){
        //订单列表
        Route::get('list', '/lst');
        //订单详情
        Route::get('detail/:id', '/detail');
    })->prefix('openapi.store.StoreOrder');

    Route::group('product',function(){
        Route::post('create', '/create');
        //商品列表
        Route::get('list', '/lst');
        //商品详情
        Route::get('detail/:id', '/detail');
    })->prefix('openapi.store.StoreProduct');
})->middleware(AllowOriginMiddleware::class)
    ->middleware(\app\common\middleware\OpenApiAuthMiddleware::class,true);

