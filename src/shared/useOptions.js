

const all = {label:'ALL',value:'all',default:true}
const major = {label:'Major',value:'major_name'} 
const teacher_name = {label:'Teacher Name',value:'teacher_name'}
const course_id = {label:'Course ID',value:'course_id'}
const course_name = {label:'Course Name',value:'course_name'}

// const FilterOptions = [all,teacher_name,course_id,course_name,major]
export const useOptions = (options = []) => {
    
    if(options.length <1 || (options.length===1 && options[0].toLowerCase() === 'all' )) return [all,major,course_id,course_name,teacher_name];
    // console.log(options.map(data=> {  
    //     let _option = data.toLowerCase();
    //     if(_option === 'all') return;
    //     if(_option === 'major_name') return major;
    //     if(_option === 'teacher_name') return teacher_name;
    //     if(_option === 'course_id') return course_id;
    //     if(_option === 'course_name') return course_name;
    // }))
   return [all,...options.map(data=> {  
                    let _option = data.toLowerCase();
                    if(_option === 'major_name') return major;
                    if(_option === 'teacher_name') return teacher_name;
                    if(_option === 'course_id') return course_id;
                    if(_option === 'course_name') return course_name;
                })].filter(data => !!data)
}


export const useYearOptions = () =>
{
    return '2564';
}