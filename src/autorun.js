import { autorun } from "mobx";

export default function({ common }) {
  // Update document title whenever it changes
  autorun(() => {
    if (common.title) {
      //   debugger;
      document.title = common.title;
    }
  });
}
