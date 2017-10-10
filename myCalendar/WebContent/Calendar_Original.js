/**
 * edited by : Soim Sung
 * edited date : 2017.09.29
 */

$(function(){
var calendar = new controller(); 
calendar.init();

function controller(target) {

	var that = this;   
	var m_oMonth = new Date();
	m_oMonth.setDate(1); //현재 달의 날짜를 1일로 잡음

	//달력의 초기화
	this.init = function() {
		that.renderCalendar(); //달력 UI 생성
		that.initEvent(); //<>(이동) 버튼 생성
	}

    /* 달력 UI 생성 */
	this.renderCalendar = function() {
		var arrTable = []; //배열을 만들어서 달력 테이블을 저장

		arrTable.push('<table><colgroup>');
		for(var i=0; i<7; i++) {
			arrTable.push('<col width="100">');
		}		
		arrTable.push('</colgroup><thead><tr>');

		var arrWeek = "일월화수목금토".split("");

		for(var i=0, len=arrWeek.length; i<len; i++) {
			var sClass = '';
			sClass += i % 7 == 0 ? 'sun' : '';
			sClass += i % 7 == 6 ? 'sat' : '';
			arrTable.push('<td class="'+sClass+'">' + arrWeek[i] + '</td>');
		}
		arrTable.push('</tr></thead>');
		arrTable.push('<tbody>');

		var oStartDt = new Date(m_oMonth.getTime());
        // 1일에서 1일의 요일을 빼면 그 주 첫번째 날이 나온다.
        //(해당 달의 첫째날을 구하는 공식 - 예를 들어 2017년 9월 달력의 첫째날은 1 - 5 = -4 일인 8월 27일부터 시작한다.)
		oStartDt.setDate(oStartDt.getDate() - oStartDt.getDay());

		for(var i=0; i<100; i++) {
			if(i % 7 == 0) { //7일마다 행을 추가
				arrTable.push('<tr>');
			}

			var sClass = 'date-cell '
            sClass += m_oMonth.getMonth() != oStartDt.getMonth() ? 'not-this-month ' : '';
			sClass += i % 7 == 0 ? 'sun' : '';
			sClass += i % 7 == 6 ? 'sat' : '';

			//각 열마다 날짜를 표시
      //(예: 9월 달력에서 8월 27일은 일요일이므로 <td class="date-cell not-this-month sun">27</td>로 표시될 것이다) 
			arrTable.push('<td class="'+sClass+'">' + oStartDt.getDate() + '</td>');
			oStartDt.setDate(oStartDt.getDate() + 1); //다음 날짜로 이동

			if(i % 7 == 6) { //토요일이면 행을 닫음
				arrTable.push('</tr>');
        //for문이 실행되는 동안 oStartDt의 달이 현재 달을 넘어서면 break;(for문을 중단하고 나옴)
				if(m_oMonth.getMonth() != oStartDt.getMonth()) {
					break;
				}
			}
		}
		arrTable.push('</tbody></table>'); //달력 테이블 끝

		$('#calendar').html(arrTable.join("")); //div에 달력을 출력(join(): 배열의 원소를 연결하여 하나의 값으로 만드는 메소드, ""은 구분자를 의미)

		that.changeMonth(); //년과 달 표시
	}

    /* Next, Prev 버튼 이벤트 */
	this.initEvent = function() {
		$('#btnPrev').click(that.onPrevCalendar);
		$('#btnNext').click(that.onNextCalendar);
	}

    /* 이전 달력 */
	this.onPrevCalendar = function() {
		m_oMonth.setMonth(m_oMonth.getMonth() - 1); //현재 달의 전 달로 이동하여 렌더링
		that.renderCalendar();
	}

    /* 다음 달력 */
	this.onNextCalendar = function() {
		m_oMonth.setMonth(m_oMonth.getMonth() + 1); //현재 달의 다음 달로 이동하여 렌더링
		that.renderCalendar();
	}

    /* 달력 이동되면 상단에 현재 년 월 다시 표시 */
	this.changeMonth = function() {
		$('#currentDate').text(that.getYearMonth(m_oMonth).substr(0,9));
	}

    /* 날짜 객체를 년 월 문자 형식으로 변환 */
	this.getYearMonth = function(oDate) {
		return oDate.getFullYear() + '년 ' + (oDate.getMonth() + 1) + '월';
	}
};
})
