function test(states){
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    
    count_state(location, states[1], states[2]);
    show_counter();

    var action_result = reflex_agent(location, state);
    
    var txt_log = `<li class="list-group-item"> Location: ${location} | A->${states[1]} - B->${states[2]} - Action: ${action_result} </li>`    
    document.getElementById("log_space").innerHTML+=txt_log

    if (action_result == "CLEAN"){
        if (location == "A") 
            states[1] = "CLEAN";
        else if (location == "B") 
            states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") 
        states[0] = "B";
    else if (action_result == "LEFT") 
        states[0] = "A";	
    
    if(states[1] == 'CLEAN' && states[2] == 'CLEAN') 
        dirty_states(states);
    
    const mayor2 = (current_value) => current_value >= 2;
    if(ls_counter.every(mayor2)) {
        alert('Finalizado')
        return;
    }
    
    setTimeout(function(){ test(states); }, 500);
}

function count_state(location, left, right) {    
    if (location == 'A' && left == 'DIRTY' && right == 'DIRTY') 
        ls_counter[0]+=1;
    else if (location == 'B' && left == 'DIRTY' && right == 'DIRTY') 
        ls_counter[1]+=1;
    else if (location == 'A' && left == 'DIRTY' && right == 'CLEAN') 
        ls_counter[2]+=1;
    else if (location == 'B' && left == 'DIRTY' && right == 'CLEAN') 
        ls_counter[3]+=1;
    else if (location == 'A' && left == 'CLEAN' && right == 'DIRTY') 
        ls_counter[4]+=1;
    else if (location == 'B' && left == 'CLEAN' && right == 'DIRTY') 
        ls_counter[5]+=1;
    else if (location == 'A' && left == 'CLEAN' && right == 'CLEAN') 
        ls_counter[6]+=1;
    else if (location == 'B' && left == 'CLEAN' && right == 'CLEAN') 
        ls_counter[7]+=1;
}

function reflex_agent(location, state){
    if (state=="DIRTY") 
        return "CLEAN";
    else if (location=="A") 
        return "RIGHT";
    else if (location=="B") 
        return "LEFT";
}

function dirty_states(states) {
    const states_aux = ['DIRTY', 'CLEAN']; 
    states[1] = states_aux[Math.floor(Math.random() * 2)];
    states[2] = states_aux[Math.floor(Math.random() * 2)];
}

function show_counter() {
    for (const item in ls_counter)
        document.getElementById(`cont${item}`).innerHTML = ls_counter[item];
}

const ls_counter = [0, 0, 0, 0, 0, 0, 0, 0];
var ls_states = ["A","DIRTY","DIRTY"];
test(ls_states);