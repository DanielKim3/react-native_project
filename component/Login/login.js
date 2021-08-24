import React, {useState} from 'react';
import {sha256} from 'react-native-sha256';
import Toast from 'react-native-toast-message';impo
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {setUserInfo} from '../../modules/Common';

export default LoginContent = () => {
  // react-native hooks(useState 컨퍼넌트의 상태관리를 위해 제공되는 함수이다.)
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  //리듀스에 저장된 토큰을 가져오는
  const token = useSelector(state => state.common.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //로그인 버튼을 눌렀을때 발생하는 함수
  const login_axios = async (id, pw, isAuto) => {
    //Alert.alert("ASdasd", "asdasdsa");

    if (!isAuto) {
      if (id === '') {
        Alert.alert('로그인', '아이디를 입력해주세요');
        return;
      }

      if (pw === '') {
        Alert.alert('로그인', '비밀번호를 입력해주세요');
        return;
      }

      // await sha256(pw).then(hash => {
      //   pw = hash;
      // });
    }

    //console.log(token);
    if (token) {
      try {
        //서버 API에 data를 보내 로그인 처리
        const {data} = await axios({
          url: 'http://192.168.10.202:4093/Login',
          method: 'POST',
          header: {'Content-Type': 'application/json'},
          data: {
            id,
            pw,
            token,
          },
        });
        // console.log(data);
        if (data.length !== 0) {
          console.log(data[0].IDX);
          dispatch(setUserInfo(data[0].IDX));
          //Alert.alert("로그인", "성공");
          setId('');
          setPw('');
          navigation.dispatch(StackActions.replace('Home'));
        } else {
          Alert.alert('로그인', '일치하는 회원이 없습니다');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('로그인', '로그인 오류');
      }
    }
  };
  //화면을 보여주는 부분
  return (
    <View
      style={{
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          넥스트코어
        </Text>
        <Text style={{color: 'white', fontSize: 30}}>라이브러리통합</Text>
      </View>
      <View style={styles.box_style}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="ID"
          placeholderTextColor="black"
          value={id}
          // 텍스트가 바뀔떄 마다 적용되는 옵션
          onChangeText={text => setId(text)}
        />

        <TextInput
          style={styles.textInputStyle}
          placeholder="PW"
          placeholderTextColor="black"
          secureTextEntry={true}
          value={pw}
          // 텍스트가 바뀔떄 마다 적용되는 옵션
          onChangeText={text => setPw(text)}
        />

        {/* 로그인 버튼을 누르면 login_axios로 이동 */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => login_axios(id, pw, false)}>
          <Text style={styles.loginStyle}>로그인</Text>
        </TouchableOpacity>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

//스타일 정의
const styles = StyleSheet.create({
  loginStyle: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 50,
  },
  textInputStyle: {
    width: '100%',
    height: 50,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'white',
  },
  box_style: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: 300,
    marginTop: '30%',
    padding: 20,
    alignItems: 'center',
  },
});
