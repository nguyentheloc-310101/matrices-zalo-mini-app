import ButtonIcon from 'components/button/ButtonIcon';
import React, { useEffect, useState } from 'react';
import { Header, Input } from 'zmp-ui';
import TableCustomerNav from './TableCustomerNav';
import ModalDivertingConfirm from './ModalDivertingConfirm';
import { getTopCustomer } from 'services/rpc/top-customer';
import { temp } from 'utils/date-params-default';
import { supabase } from 'services/supabse';
import useFetchZaloCustomers from 'common/stores/customers/zalo-customers';
import LoadingSquareSpin from 'components/loading';
import { ICustomerZalo } from 'common/types/customer';

const actionFilter = [
  {
    title: 'Mới nhất',
    value: 'newest',
  },
  {
    title: 'Có số điện thoại',
    value: 'havePhoneNumber',
  },
];

const CustomersNav = () => {
  const [activeCustomerDiverting, setActiveCustomerDiverting] =
    useState<boolean>(false);
  const { setZaloCustomers, zaloCustomers } = useFetchZaloCustomers();
  const [allCustomers, setAllCustomers] = useState<ICustomerZalo[]>([]);

  const [activeFilterPhone, setActiveFilterPhone] = useState<boolean>(false);
  const [activeNewest, setActiveNewest] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [indexSelect, setIndexSelect] = useState<any>(0);

  const handleOnclickRange = (index: number, value: string) => {
    if (index == indexSelect) {
      setIndexSelect(null);
      if (value == 'havePhoneNumber') {
        setActiveNewest(false);
      } else if (value == 'newest') {
        setActiveFilterPhone(false);
      }
    } else if (index !== indexSelect) {
      setIndexSelect(index);
      if (value == 'havePhoneNumber') {
        setActiveFilterPhone(true);
        setActiveNewest(false);
        filterCustomersByPhone();

        console.log('week');
      } else if (value == 'newest') {
        setActiveFilterPhone(false);
        setActiveNewest(true);
        filterNewest();
        console.log('newest');
      }
    }
  };

  const filterCustomersByPhone = () => {
    setLoading(true);
    const filterCustomersHavePhone = zaloCustomers.filter(
      (customer) => customer.phone !== null
    );
    if (filterCustomersHavePhone.length > 0) {
      setZaloCustomers(filterCustomersHavePhone);
      setLoading(false);
    } else {
      console.log('Không có khách hàng phù hợp với filter');
    }
  };
  const filterNewest = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      setZaloCustomers(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.log(error.message);
          return;
        }
        if (data) {
          setZaloCustomers(data);
          setAllCustomers(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleChangeSearch = (data: string) => {};
  return (
    <div className="h-full">
      {loading ? (
        <LoadingSquareSpin />
      ) : (
        <>
          <Header
            className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
            showBackIcon={true}
            title="Khách"
          />
          <div className="p-[16px] flex flex-col gap-[16px]">
            <Input.Search onChange={(e) => console.log(e.target.value)} />
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-[5px]">
                {actionFilter.map((action, key) => {
                  return (
                    <div
                      onClick={() => {
                        handleOnclickRange(key, action.value);
                      }}
                      className={`${
                        indexSelect == key
                          ? 'bg-[#36383A] text-white'
                          : 'bg-[white] text-[#36383A]'
                      } rounded-[8px] text-[10px]  font-[400] leading-[16px] flex items-center justify-center w- h-[24px] px-[12px] py-[4px]`}
                      key={key}>
                      {action.title}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-[8px]">
                <ButtonIcon icon={'zi-location'} />
                <ButtonIcon
                  // onClick={() => {
                  //   setDatePickerEnable(true);
                  //   setOpenModalDateRangePicker(true);
                  //   setIndexSelect(null);
                  // }}
                  // active={datePickerEnable}
                  icon={'zi-calendar'}
                />
              </div>
            </div>
            <TableCustomerNav
              setActiveCustomerDiverting={setActiveCustomerDiverting}
            />
          </div>
          {activeCustomerDiverting ?? <ModalDivertingConfirm />}
        </>
      )}
    </div>
  );
};

export default CustomersNav;
