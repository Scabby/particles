function get(id) {
    return document.getElementById(id)
}

function make(id) {
    let e = document.createElement("div")
    e.id = id
    return e
}

function r() {
    return Math.random()
}



const screen_x          = 100
const screen_y          = 100

const base_recycle_delay        = 10
const random_recycle_delay      = 5 // millis
const base_animation_duration   = 6000 // millis
const random_animation_duration = 6000 // millis

const base_particle_size    = 6
const random_particle_size  = 4

const particle_count    = 500
const usable_particles  = []

function generate_path(padding_x, lower_padding, upper_padding, skew) {
    let w = screen_x + 2 * padding_x
    let lower_x = r() * (w + lower_padding) - (lower_padding / 2) - padding_x + skew
    let lower_y = screen_y + lower_padding
    let upper_x = r() * (w + upper_padding) - (upper_padding / 2) - padding_x - skew
    let upper_y = -upper_padding

    return [
        [lower_x, lower_y],
        [upper_x, upper_y]
    ]
}

function recycle_particle() {
    if(usable_particles.length == 0) { return }

    let [start, end]    = generate_path(50, 50, 300, 100)
    let p               = usable_particles.shift()
    let time            = r() * random_animation_duration + base_animation_duration
    let size            = r() * random_particle_size + base_particle_size

    p.animate([
        { transform: "translate(" + start[0] + "vw," + start[1] + "vh)" },
        { transform: "translate(" + end[0] + "vw," + end[1] + "vh)" }
    ], {
        duration: time
    })

    p.style.width   = size + "px"
    p.style.height  = size + "px"

    setTimeout(
        () => {
            p.style.width = "0"
            usable_particles.push(p)
        },
        time
    )
}

function create_particles() {
    for(let i= 0; i < particle_count; i++) {
        let p = make("particle" + i)
        p.className = "particle"
        get("screen").appendChild(p)
        usable_particles.push(p)
    }
}

function loop(delay) {
    recycle_particle()

    setTimeout(
        () => { loop(delay) },
        delay + r() * random_recycle_delay
    )
}

onload = () => {
    create_particles()
    loop(base_recycle_delay)
}

ontouchstart = (e) => {
    e.preventDefault()
}

ontouchmove = (e) => {
    e.preventDefault()
    e.stopPropagation()
}
