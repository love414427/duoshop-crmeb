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


namespace app\common\repositories\store;


use app\common\dao\store\CityAreaDao;
use app\common\repositories\BaseRepository;
use FormBuilder\Factory\Elm;
use think\exception\ValidateException;
use think\facade\Route;

/**
 * @mixin CityAreaDao
 */
class CityAreaRepository extends BaseRepository
{
    public function __construct(CityAreaDao $dao)
    {
        $this->dao = $dao;
    }

    public function getChildren($pid)
    {
        return $this->search(['pid' => $pid])->select();
    }

    public function getList($where)
    {
        return  $this->dao->getSearch($where)->with(['parent'])->order('id ASC')->select()->append(['children','hasChildren']);
    }

    public function form(?int $id, ?int $parentId)
    {
        $parent = ['id' => 0, 'name' => '全国', 'level' => 0,];
        $formData = [];
        if ($id) {
            $formData = $this->dao->getWhere(['id' => $id],'*',['parent'])->toArray();
            if (!$formData) throw new ValidateException('数据不存在');
            $form = Elm::createForm(Route::buildUrl('systemCityAreaUpdate', ['id' => $id])->build());
            if (!is_null($formData['parent'])) $parent = $formData['parent'];
        } else {
            $form = Elm::createForm(Route::buildUrl('systemCityAreaCreate')->build());
            if ($parentId) $parent = $this->dao->getWhere(['id' => $parentId]);
        }
        $form->setRule([
            Elm::input('parent_id', '', $parent['id'] ?? 0)->hiddenStatus(true),
            Elm::input('level', '', $parent['level'] + 1)->hiddenStatus(true),
            Elm::input('parent_name', '上级地址', $parent['name'])->disabled(true),
            Elm::input('name', '地址名称', '')->required(),
        ]);
        return $form->setTitle($id ? '编辑城市' : '添加城市')->formData($formData);
    }

    /**
     * TODO 添加
     * @param $name
     * @param $pid
     * @param $lv
     * @return mixed
     * @author Qinii
     * @day 2023/8/2
     */
    public function treeCreate($name,$code, $pid = 0, $lv = 1)
    {
        $type = [
            1 => 'province',
            2 => 'city',
            3 => 'area',
            4 => 'street',
        ];
        $path = '/';
        if ($pid){
            $res =  $this->dao->get($pid);
            $path = $res['path'].$res['id'].'/';
        }
        $data = [
            'type' => $type[$lv],
            'parent_id' => $pid,
            'level' => $lv,
            'name' => $name,
            'path'=> $path,
            'code' => $code
        ];
        $result =  $this->dao->findOrCreate($data);
        return $result->id;
    }

    /**
     * TODO 计算子集个数
     * @author Qinii
     * @day 2023/8/2
     */
    public function sumChildren()
    {
        $data = $this->dao->getSearch([])->where('level','<',4)->select();
        foreach ($data as $datum) {
            $snum = $this->dao->getSearch([])->where('parent_id',$datum->id)->count();
            $datum->snum = $snum;
            $datum->save();
        }
    }
}
