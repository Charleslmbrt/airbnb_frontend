import { useState, useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Cascader, InputNumber, Select, Space } from "antd";

const PriceRange = ({
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  setDisplayRooms,
  handleCancel,
}) => {
  return (
    <>
      <Space direction="vertical" className="flex flex-row justify-between">
        <div>
          <p>Minimum Price</p>
          <InputNumber
            step={10}
            addonAfter="€"
            defaultValue={10}
            value={priceMin}
            onChange={(value) => {
              setPriceMin(value);
            }}
          />
        </div>

        <div>
          <p>Maximum Price</p>
          <InputNumber
            step={10}
            addonAfter="€"
            defaultValue={2000}
            value={priceMax}
            onChange={(value) => {
              setPriceMax(value);
            }}
          />
        </div>
      </Space>
      <div className="mt-5 flex justify-between">
        <button
          className="underline"
          onClick={() => {
            setDisplayRooms(false);
            handleCancel();
          }}
        >
          Clear filters
        </button>
        <button
          className="p-3 bg-red-500 rounded-lg text-white text-sm text-center cursor-pointer lg:w-40"
          onClick={() => {
            setDisplayRooms(true);
            handleCancel();
          }}
        >
          Display rooms
        </button>
      </div>
    </>
  );
};

export default PriceRange;
