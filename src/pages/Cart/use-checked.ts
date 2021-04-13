import { useReducer, useCallback } from 'react'

const CHECKED_CHANGE = 'CHECKED_CHANGE'
const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE'
const SET_CHECKED_MAP = 'SET_CHECKED_MAP'

interface Option {
  key?: string
}

type CheckedMap = {
  [key: string]: boolean
}

type CheckedChange<T> = {
  type: typeof CHECKED_CHANGE
  payload: {
    dataItem: T,
    checked: boolean
  }
}

type CheckedAllChange = {
  type: typeof CHECKED_ALL_CHANGE
  payload: boolean
}

type SetCheckedMap = {
  type: typeof SET_CHECKED_MAP
  payload: CheckedMap
}

type Action<T> = CheckedChange<T> | CheckedAllChange | SetCheckedMap

export type OnCheckedChange<T> = (item: T, checked: boolean) => any



/**
 * @description: 提供勾选、全选、反选等功能
 * @param {*} dataSource
 * @return {*}
 */
export const useChecked = <T extends Record<string, any>>(
  dataSource: T[],
  { key = "id" }: Option = {}
) => {

  const [checkedMap, dispatch] = useReducer((checkedMapParam: CheckedMap, action: Action<T>) => {
    switch (action.type) {
      case CHECKED_CHANGE: {
        const { payload } = action
        const { dataItem, checked } = payload
        const { [key]: id } = dataItem
        return {
          ...checkedMapParam,
          [id]: checked
        }
      }

      case CHECKED_ALL_CHANGE: {
        const { payload: newCheckedAll } = action
        const newCheckedMap: CheckedMap = {}
        // 全选
        if (newCheckedAll) {
          dataSource.forEach(dataItem => {
            newCheckedMap[dataItem.id] = true
          })
        }
        return newCheckedMap
      }

      case SET_CHECKED_MAP: {
        return action.payload
      }

      default:
        return checkedMapParam
    }
  }, {})

  /**
   * @description: 勾选状态变更
   * @param {*} dataItem, checked
   * @return {*}
   */  
  const onCheckedChange: OnCheckedChange<T> = useCallback((dataItem, checked) => {
    dispatch({
      type: CHECKED_CHANGE,
      payload: {
        dataItem,
        checked
      }
    })
  }, [])

  type FilterCheckedFunc = (item: T) => boolean
  const filterChecked = useCallback(
    (func: FilterCheckedFunc = () => true) => {
    return (
      Object.entries(checkedMap)
        .filter(entries => Boolean(entries[1]))
        .map(([checkedId]) => dataSource.find(({ [key]: id }) => id === Number(checkedId)))
        // 有可能勾选了以后直接删除 此时id虽然在checkedMap里 但是dataSource里已经没有这个数据了
        // 先把空项过滤掉 保证外部传入的func拿到的不为undefined
        .filter(Boolean)
        .filter(func as any) as T[]
    )
  }, [checkedMap, dataSource, key])

  /**
   * @description: 是否全选状态
   * @param {*}
   * @return {*}
   */  
  const checkedAll = dataSource && dataSource.length !== 0 && filterChecked().length === dataSource.length

  /**
   * @description: 全选反选
   * @param {boolean} newCheckedAll
   * @return {*}
   */  
  const onCheckedAllChange = (newCheckedAll: boolean) => {
    dispatch({
      type: CHECKED_ALL_CHANGE,
      payload: newCheckedAll
    })
  }

  return {
    checkedMap,
    onCheckedChange,
    onCheckedAllChange,
    checkedAll,
    filterChecked,
  }


}

