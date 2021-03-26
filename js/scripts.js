$(document).ready(function () {

    const numbers = "0123456789";
    const lowercase = "abcdefghijklmnopqrstuwvxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const special = "!@&#)(%^*?";
    
    //CLICK ON SUBMIT
    $("#send-button").click(function (e) {

        //Hide alert if present
        $("#copied-alert").css( "display", "none");

        e.preventDefault();
        var string = "";
        let numchecked = false;
        let lowerchecked = false;
        let upperchecked = false;
        let specialchecked = false;


        if ($('#numbers').is(":checked"))
            numchecked = true;

        if ($('#lowercase').is(":checked"))
            lowerchecked = true;

        if ($('#uppercase').is(":checked"))
            upperchecked = true;

        if ($('#special').is(":checked"))
            specialchecked = true;

        //If any option is checked
        if (numchecked || lowerchecked || upperchecked || specialchecked) {
            //Build string
            string = buildString(numchecked, lowerchecked, upperchecked, specialchecked);

            let quantity = $("#quantity").val();
            if (quantity < 8)
                quantity = 8;

            //Build password
            let password = buildPassword(string, quantity);

            //Hide no option alert if present
            $("#alert-no-option").css( "display", "none");

            //Show password
            $("#password-div").css("display", "block");
            $("#password").val(password);
        }
        else{
           $("#alert-no-option").css( "display", "block");
        }
    });

    function buildString(numchecked, lowerchecked, upperchecked, specialchecked) {

        let answer = "";

        if (numchecked)
            answer += numbers;

        if (lowerchecked)
            answer += lowercase;

        if (upperchecked)
            answer += uppercase;

        if (specialchecked)
            answer += special;

        return answer;
    }

    function buildPassword(string, quantity) {
        let answer = "";
        for (let i = 0; i < quantity; i++) {
            //Returns a random integer from 0 to string.length
            const num = Math.floor(Math.random() * string.length);
            const char = string[num];
            answer += char;
        }
        return answer;
    }

    //COPY PASSWORD TO CLIPBOARD
    $("#password").click(function (e) {

        this.focus();
        this.select();
        try {  
            var successful = document.execCommand('copy');  
        } catch(err) {  
            console.error('Unable to copy'); 
        }		
        $("#copied-alert").css("display", "block");
    });

});