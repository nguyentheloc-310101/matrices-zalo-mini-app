import { Skeleton, message } from 'antd';
import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import BoxButton from 'components/overall-statistics/box-button';
import React, { useEffect, useState } from 'react';
import { supabase } from 'services/supabse';
import { Header, Icon } from 'zmp-ui';
const sections = [
  {
    name: 'Doanh thu',
    icon: (
      <img
        src="https://ucarecdn.com/85096b89-fa37-44cc-b258-045488132d78/"
        className="w-[24px] h-[24px]"
      />
    ),
    link: '/revenue',
  },
  {
    name: 'Orders & Bookings',
    icon: <Icon icon="zi-note" />,
    link: '/order-bookings',
  },
  {
    name: 'Khách hàng',
    icon: <Icon icon="zi-group" />,
    link: '',
  },
  {
    name: 'Nhân viên',
    icon: (
      <img
        src="https://ucarecdn.com/fe99379d-f37f-48ca-90c6-edf24fd93ca9/"
        className="w-[24px] h-[24px]"
      />
    ),
    link: '',
  },
  {
    name: 'Dịch vụ',
    icon: (
      <img
        src="https://ucarecdn.com/268571e8-1cae-453b-95d4-dca545be8cce/-/quality/smart/-/format/auto/"
        className="w-[24px] h-[24px]"
      />
    ),
    link: '',
  },
  {
    name: 'Sales report',
    icon: <Icon icon="zi-poll" />,
    link: '',
  },
];
const OverallStatistics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { clinics, setClinics } = useFetchClinic();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: allClinics, error: errClinics } = await supabase
          .from('clinics')
          .select('*');
        if (errClinics) {
          message.error(errClinics.message);
          return;
        }
        if (allClinics) {
          setClinics(allClinics);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // Call the async function
  }, []);

  return (
    <>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={false}
        title="AURA MANAGER"
      />
      <div className="p-[16px] w-full flex items-center justify-center flex-wrap gap-[16px]">
        {sections.map((section, index) => (
          <BoxButton
            key={index}
            icon={section.icon}
            text={section.name}
            link={section.link}
          />
        ))}
      </div>
    </>
  );
};

export default OverallStatistics;
