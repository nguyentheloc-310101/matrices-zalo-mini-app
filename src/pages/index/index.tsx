import React, { useEffect, useState } from 'react';
import { Box, Page, useNavigate } from 'zmp-ui';
import { Welcome } from './welcome';
import Lottie from 'lottie-react';
import lottie from '../../static/lottie/animation_llkpplro.json';
import { IUser } from 'common/types/user';
import useFetchZaloUser from 'common/stores/users/user-login';
import { getUserInfo, login } from 'zmp-sdk/apis';
import { getPhoneNumber } from 'zmp-sdk/apis';
import { supabase } from 'services/supabse';

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate('/overall-statistics');
  };

  const [user, setUser] = useState<IUser>();
  const { userLogin, setUserLogin } = useFetchZaloUser();
  useEffect(() => {
    user == null && getUser();
  }, []);
  const getUser = async () => {
    try {
      await login({});
      const { userInfo } = await getUserInfo();
      let flag = await checkUser(userInfo.id);
      if (flag) {
        getUserPhoneByZaloId(userInfo.id);
      }
      console.log(userInfo.id);
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  const getUserPhoneByZaloId = async (zalo_id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('zalo_id', zalo_id);
    if (data) {
      console.log(data);
    }
  };
  const checkUser = async (id: string) => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('zalo_id', id);
      if ((user && user?.length == 0) || !user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <div className="flex items-center flex-col justify-center">
          <Lottie
            animationData={lottie}
            loop={true}
            className="w-[343px] mt-[60px] h-[343px] object-contain"
          />

          <button
            onClick={onHandleClick}
            className="bg-[#36383A] mt-[50px] h-[44px] rounded-[8px] w-[343px] px-[24px] text-[14px] font-[700] leading-[20px] tracking-[1.25px] py-[12px] text-[white]">
            Đăng nhập bằng Zalo
          </button>

          <div className="text-[14px] font-[700] mt-[8px] text-[#36383A] leading-[20px] tracking-[0.1px]">
            Bạn chưa có tài khoản?{' '}
            <span className="text-[#BC2449]"> Liên hệ với Admin.</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center mt-[30px]">
          <img
            src="https://ucarecdn.com/3a1ae635-d250-4910-a931-d47b2fd5ebc6/-/quality/smart/-/format/auto/"
            className="w-[103px]"
          />
        </div>
      </Box>
    </Page>
  );
};

export default HomePage;
