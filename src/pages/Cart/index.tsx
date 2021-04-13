/*
 * @Author: your name
 * @Date: 2021-04-06 16:50:49
 * @LastEditTime: 2021-04-13 15:33:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hook-typescript-demo/src/pages/Cart/index.tsx
 */
import React, { Component } from 'react';
import { useRequest } from 'umi';
import {
  List,
  Typography,
} from 'antd';
import ItemCard from './ItemCard'
import { useChecked } from './use-checked'
import './index.css'

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export default function Cart() {

  const {data, error, loading} = useRequest('/api/cart')
  const {
    checkedMap,
    onCheckedChange,
    onCheckedAllChange,
    checkedAll,
    filterChecked,
  } = useChecked(data)

  const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkAll = e.target.checked
    onCheckedAllChange(checkAll)
  }

  const sumPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((sum, cur) => sum + cur.price, 0)
  }

  const total = sumPrice(filterChecked())

  const Footer = (
    <div className="footer">
      <div className="check-all">
        <input type="checkbox" checked={checkedAll} onChange={onWrapCheckedChange} />全选
      </div>
      <div>价格总计<Typography.Text mark>${total}</Typography.Text></div>
    </div>
  )

  return (
    <div className="cart">
      <List
        header={<div>购物车</div>}
        footer={Footer}
        bordered
        dataSource={data}
        renderItem={item => {
          const checked = checkedMap[item.id] || false
          return (<List.Item>
            <ItemCard item={item} checked={checked} onCheckedChange={onCheckedChange} />  
          </List.Item>)
        }}
      >

      </List>
    </div>
  )
}