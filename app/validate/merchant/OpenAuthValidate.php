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


namespace app\validate\merchant;


use think\Validate;

class OpenAuthValidate extends Validate
{
    protected $failException = true;

    protected $rule = [
        'title|标题' => 'require',
        'access_key|accessKey' => 'require|unique:open_auth,access_key',
        'auth|权限' => 'require|checkAuth',
    ];

    public function checkAuth()
    {
        return true;
    }

    public  function sceneEdit()
    {
        return $this->only(['title','auth']);
    }

}
