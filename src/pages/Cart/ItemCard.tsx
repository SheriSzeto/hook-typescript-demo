/*
 * @Author: your name
 * @Date: 2021-04-06 18:06:24
 * @LastEditTime: 2021-04-13 15:47:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hook-typescript-demo/src/pages/Cart/ItemCard.tsx
 */
import React, { useMemo } from 'react';
import {
  Typography
} from 'antd';
import { CartItem } from './index'
import { OnCheckedChange } from './use-checked'

interface Props {
  item: CartItem;
  checked: boolean;
  onCheckedChange: OnCheckedChange<CartItem>;
}

const ItemCard = (props: Props) => {
  return useMemo(() => {
    const {item, checked, onCheckedChange} = props;
    const {name, price} = item;

    const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {checked} = e.target
      onCheckedChange(item, checked)
    }

    return (
      <div className="item-card">
        <div className="checkbox-wrap">
          <input 
            type="checkbox"
            checked={checked}
            onChange={onWrapCheckedChange}
          />
        </div>
        <p className="item-info">
          {name} <Typography.Text mark>${price}</Typography.Text>
        </p>
      </div>
    )
  }, [props.checked])
  
}

export default ItemCard;