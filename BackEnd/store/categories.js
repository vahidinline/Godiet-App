const categories = [
  {
    label: "بدون تحرک یا کم تحرک",
    name: "عدم تحرک",
    value: 1,
  },
  {
    label: "یک تا سه روز ورزش در هفته",
    name: "فعالیت کم",
    value: 2,
  },
  {
    label: "سه تا پنح روز ورزش در هفته",
    name: "نسبتا فعال",
    value: 3,
  },
  {
    label: "شش تا هفت روز ورزش در هفته",
    name: "فعال",
    value: 4,
  },
  {
    label: "ورزشکار حرفه ای",
    name: "خیلی فعال",
    value: 5,
  },
];

const getCategories = () => categories;

const getCategory = (value) => categories.find((c) => c.value === value);

module.exports = {
  getCategories,
  getCategory,
};
