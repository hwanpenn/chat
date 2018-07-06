package com.shineyue.chat.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

//@RestController @RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。
//如果只是使用@RestController注解Controller，则Controller中的方法无法返回jsp页面，配置的
//视图解析器InternalResourceViewResolver不起作用，返回的内容就是Return 里的内容
@Controller
public class ChatController {

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        return "home";
    }
    @RequestMapping(value = "/home1", method = RequestMethod.GET)
    public String home1() {
        return "home1";
    }
    @RequestMapping(value = "/home2", method = RequestMethod.GET)
    public String home2() {
        return "home2";
    }
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }
    @RequestMapping(value = "/mobile", method = RequestMethod.GET)
    public String mobile() {
        return "mobile";
    }
    @RequestMapping(value = "/mobile1", method = RequestMethod.GET)
    public String mobile1() {
        return "mobile1";
    }
    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String error() {
        return "error";
    }
    @RequestMapping(value = "/undefined", method = RequestMethod.GET)
    public String undefined() {
        return "error";
    }
    @RequestMapping(value = "/chat", method = RequestMethod.GET)
    public String chat() {
        return "chat";
    }
    @RequestMapping(value = "/demo", method = RequestMethod.GET)
    public String demo() {
        return "demo";
    }
    @RequestMapping(value = "/demo1", method = RequestMethod.GET)
    public String demo1() {
        return "demo1";
    }

}