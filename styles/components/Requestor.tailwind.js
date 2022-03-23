export const styles = {
  /***** Main Styles  *****/
  container: 'pt-2 h-half absolute left-[3.5rem]  bottom-0 flex flex-col items-center justify-center py-[3rem] z-10',
  inner:
    'h-full w-[20rem] backdrop-filter backdrop-blur-2xl bg-gradient-to-br from-[#ffffff80] to-[#ffffff80] rounded-lg flex flex-col ',

  /***** Header Styles *****/
  header: 'w-full font-bold text-left flex items-center text-2xl p-4 overflow-hidden',
  itemContainer: 'flex flex-col mb-4 relative',
  item: 'h-10 mx-4 border-2 bg-[#fff] shadow-2xl flex items-center my-1 py-1 px-2',
  itemFocused: 'border-black',
  svgContainer: 'mx-1',
  input: 'my-2 rounded-2 p2 outline-none border-none bg-transparent h-full w-full',
  verticalLine: 'w-0 h-[2rem] border-black border absolute z-10 left-[2.313rem] top-8',

  /***** Selector Styles *****/
  selectorWrapper: 'h-full flex flex-col',
  title: 'text-gray-500 text-center text-xs py-2 border-b  border-gray-500',
  optionList: 'flex items-center justify-around',
  optionImage: 'h-14',
  optionTitle: 'flex-1 font-medium',
  option: 'p-3 m-2  text-center',
  priceContainer: 'flex-1 mt-2',
  timeDistance: 'text-green-500 text-center text-xs py-2 italic',
  price: 'flex items-center justify-center font-medium -mt-1',
  ethLogo: 'h-10 self-center',

  /***** Confirm Styles *****/
  confirmWrapper: 'flex-1 h-full flex flex-col justify-between',
  confirmContainer: 'h-full flex flex-col',
  confirmButtonContainer: ' cursor-pointer z-10',
  confirmButton: 'bg-black text-white m-4 py-2 text-center text-xl',
};
