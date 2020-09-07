/// <reference path="./app/utils/testing/jasmine-custom-matchers.d.ts"/>

/* SystemJS module definition */
declare const nodeModule: NodeModule;

interface NodeModule {
  id: string;
}

interface Window {
  require: any;
}
